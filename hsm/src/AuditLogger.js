/**
 * Audit Logger - Immutable Audit Logging for HSM Operations
 * 
 * FIPS 140-2 Level 3 requires comprehensive audit logging with:
 * - Tamper-evident logs
 * - Timestamps from trusted sources
 * - Integrity verification
 * - Long-term retention
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class AuditLogger {
  constructor(config = {}) {
    this.logPath = config.logPath || '/var/log/certtrust/audit.log';
    this.retentionDays = config.retentionDays || 365;
    this.enableConsole = config.enableConsole !== false;
    this.siemEndpoint = config.siemEndpoint;
    
    // Ensure log directory exists
    const logDir = path.dirname(this.logPath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    // Initialize log chain (for tamper evidence)
    this.lastHash = this.getLastHash();
    
    console.log(`🔒 Audit Logger initialized: ${this.logPath}`);
  }
  
  /**
   * Log an event
   */
  log(level, message, metadata = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      metadata,
      hostname: require('os').hostname(),
      pid: process.pid,
      userId: metadata.userId || 'system',
      sessionId: metadata.sessionId || crypto.randomBytes(16).toString('hex'),
      requestId: metadata.requestId || crypto.randomBytes(8).toString('hex')
    };
    
    // Calculate hash chain for tamper evidence
    const previousHash = this.lastHash || '0'.repeat(64);
    const entryString = JSON.stringify(entry) + previousHash;
    entry.hash = crypto.createHash('sha256').update(entryString).digest('hex');
    this.lastHash = entry.hash;
    
    // Write to file
    this.writeToFile(entry);
    
    // Write to console
    if (this.enableConsole) {
      this.writeToConsole(entry);
    }
    
    // Send to SIEM if configured
    if (this.siemEndpoint) {
      this.sendToSIEM(entry);
    }
    
    return entry;
  }
  
  /**
   * Log info level
   */
  static info(message, metadata = {}) {
    return AuditLogger.getInstance().log('info', message, metadata);
  }
  
  /**
   * Log success level
   */
  static success(message, metadata = {}) {
    return AuditLogger.getInstance().log('success', message, metadata);
  }
  
  /**
   * Log warning level
   */
  static warn(message, metadata = {}) {
    return AuditLogger.getInstance().log('warn', message, metadata);
  }
  
  /**
   * Log error level
   */
  static error(message, metadata = {}) {
    return AuditLogger.getInstance().log('error', message, metadata);
  }
  
  /**
   * Log critical level
   */
  static critical(message, metadata = {}) {
    return AuditLogger.getInstance().log('critical', message, metadata);
  }
  
  /**
   * Log security event
   */
  static security(eventType, details = {}) {
    return AuditLogger.getInstance().log('security', eventType, {
      ...details,
      securityEvent: true
    });
  }
  
  /**
   * Write log entry to file
   */
  writeToFile(entry) {
    const logLine = JSON.stringify(entry) + '\n';
    
    try {
      fs.appendFileSync(this.logPath, logLine);
    } catch (error) {
      console.error('Failed to write audit log:', error);
    }
  }
  
  /**
   * Write log entry to console
   */
  writeToConsole(entry) {
    const colors = {
      info: '\x1b[36m',      // Cyan
      success: '\x1b[32m',   // Green
      warn: '\x1b[33m',      // Yellow
      error: '\x1b[31m',     // Red
      critical: '\x1b[35m',  // Magenta
      security: '\x1b[34m'   // Blue
    };
    
    const reset = '\x1b[0m';
    const color = colors[entry.level] || reset;
    
    const timestamp = entry.timestamp.split('T')[1].split('.')[0];
    const message = `[${timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;
    
    console.log(`${color}${message}${reset}`);
    
    if (entry.level === 'error' || entry.level === 'critical') {
      console.error(entry.metadata);
    }
  }
  
  /**
   * Send log entry to SIEM
   */
  async sendToSIEM(entry) {
    // Implementation depends on SIEM system
    // Examples: Splunk, Elastic, Datadog, etc.
    
    try {
      // Placeholder for actual SIEM integration
      // await fetch(this.siemEndpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(entry)
      // });
    } catch (error) {
      console.error('Failed to send to SIEM:', error);
    }
  }
  
  /**
   * Get last hash from log file
   */
  getLastHash() {
    try {
      if (!fs.existsSync(this.logPath)) {
        return null;
      }
      
      const content = fs.readFileSync(this.logPath, 'utf8');
      const lines = content.trim().split('\n');
      
      if (lines.length === 0) {
        return null;
      }
      
      const lastEntry = JSON.parse(lines[lines.length - 1]);
      return lastEntry.hash;
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Verify log integrity
   */
  verifyIntegrity() {
    try {
      const content = fs.readFileSync(this.logPath, 'utf8');
      const lines = content.trim().split('\n');
      
      let previousHash = '0'.repeat(64);
      let valid = true;
      let invalidEntries = [];
      
      for (let i = 0; i < lines.length; i++) {
        const entry = JSON.parse(lines[i]);
        const entryWithoutHash = { ...entry };
        delete entryWithoutHash.hash;
        
        const entryString = JSON.stringify(entryWithoutHash) + previousHash;
        const calculatedHash = crypto.createHash('sha256').update(entryString).digest('hex');
        
        if (calculatedHash !== entry.hash) {
          valid = false;
          invalidEntries.push(i);
        }
        
        previousHash = entry.hash;
      }
      
      return {
        valid,
        totalEntries: lines.length,
        invalidEntries,
        lastVerified: new Date().toISOString()
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }
  
  /**
   * Rotate log file
   */
  rotateLog() {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const rotatedPath = `${this.logPath}.${timestamp}`;
      
      if (fs.existsSync(this.logPath)) {
        fs.renameSync(this.logPath, rotatedPath);
        console.log(`📦 Log rotated: ${rotatedPath}`);
      }
      
      // Reset hash chain
      this.lastHash = null;
      
      return rotatedPath;
    } catch (error) {
      console.error('Failed to rotate log:', error);
      throw error;
    }
  }
  
  /**
   * Clean old logs based on retention policy
   */
  cleanOldLogs() {
    try {
      const logDir = path.dirname(this.logPath);
      const files = fs.readdirSync(logDir);
      const now = Date.now();
      const retentionMs = this.retentionDays * 24 * 60 * 60 * 1000;
      
      let deletedCount = 0;
      
      for (const file of files) {
        const filePath = path.join(logDir, file);
        const stats = fs.statSync(filePath);
        
        if (now - stats.mtimeMs > retentionMs) {
          fs.unlinkSync(filePath);
          deletedCount++;
          console.log(`🗑️  Deleted old log: ${file}`);
        }
      }
      
      console.log(`✅ Cleaned ${deletedCount} old log files`);
      return deletedCount;
    } catch (error) {
      console.error('Failed to clean old logs:', error);
      throw error;
    }
  }
  
  /**
   * Get audit statistics
   */
  getStats() {
    try {
      const content = fs.readFileSync(this.logPath, 'utf8');
      const lines = content.trim().split('\n');
      
      const stats = {
        total: lines.length,
        byLevel: {},
        byDate: {},
        securityEvents: 0
      };
      
      for (const line of lines) {
        const entry = JSON.parse(line);
        
        // Count by level
        stats.byLevel[entry.level] = (stats.byLevel[entry.level] || 0) + 1;
        
        // Count by date
        const date = entry.timestamp.split('T')[0];
        stats.byDate[date] = (stats.byDate[date] || 0) + 1;
        
        // Count security events
        if (entry.metadata.securityEvent) {
          stats.securityEvents++;
        }
      }
      
      return stats;
    } catch (error) {
      return {
        error: error.message
      };
    }
  }
  
  /**
   * Singleton instance
   */
  static getInstance(config) {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger(config);
    }
    return AuditLogger.instance;
  }
}

module.exports = AuditLogger;
