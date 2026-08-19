export interface SanitizeResult {
  isClean: boolean;
  cleanText: string;
  violations: string[];
}

export function sanitizeMessageText(text: string): SanitizeResult {
  const violations: string[] = [];
  let sanitized = text;

  // Regex patterns for contact information leakage
  const patterns = [
    { name: 'Phone Number', regex: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b\d{10}\b/g },
    { name: 'Email Address', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g },
    { name: 'WhatsApp/Telegram Handle', regex: /(whatsapp|wa\.me|telegram|t\.me|viber|signal|line):\s*\+?[0-9a-zA-Z._-]+/gi },
    { name: 'Social Media / URLs', regex: /(https?:\/\/[^\s]+)|(instagram\.com|facebook\.com|linkedin\.com)\/[^\s]+/gi },
  ];

  for (const { name, regex } of patterns) {
    if (regex.test(sanitized)) {
      violations.push(name);
      sanitized = sanitized.replace(regex, '[REDACTED CONTACT INFO]');
    }
  }

  return {
    isClean: violations.length === 0,
    cleanText: sanitized,
    violations,
  };
}