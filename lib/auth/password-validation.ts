/**
 * Password strength validation utilities
 */

export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  isValid: boolean;
}

/**
 * Validate password strength and return feedback
 */
export function validatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  // Check minimum length
  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters long');
  } else if (password.length >= 12) {
    score += 2;
  } else {
    score += 1;
  }

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    feedback.push('Add at least one uppercase letter');
  } else {
    score += 1;
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    feedback.push('Add at least one lowercase letter');
  } else {
    score += 1;
  }

  // Check for numbers
  if (!/[0-9]/.test(password)) {
    feedback.push('Add at least one number');
  } else {
    score += 1;
  }

  // Check for special characters
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push('Add at least one special character (!@#$%^&*...)');
  } else {
    score += 1;
  }

  // Check for common patterns
  const commonPatterns = [
    /^(password|123456|qwerty|abc123|letmein|monkey|dragon|baseball|iloveyou|sunshine)/i,
    /^([a-z])\1+$/i, // repeated characters
    /^(12345|23456|34567|45678|56789|67890|09876|98765|87654|76543|65432|54321)/,
    /^(abcdef|bcdefg|cdefgh|defghi|efghij|fghijk)/i,
  ];

  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      feedback.push('Avoid common passwords and patterns');
      score = Math.max(0, score - 2);
      break;
    }
  }

  // Normalize score to 0-4 range
  score = Math.min(4, Math.max(0, Math.floor(score / 1.5)));

  // Determine if password is valid (minimum score of 2)
  const isValid = score >= 2 && password.length >= 8;

  // Add encouraging feedback based on score
  if (score === 0) {
    feedback.push('Very weak password - please make it stronger');
  } else if (score === 1) {
    feedback.push('Weak password - add more complexity');
  } else if (score === 2) {
    feedback.push('Fair password - consider making it stronger');
  } else if (score === 3) {
    feedback.push('Good password strength');
  } else if (score === 4) {
    feedback.push('Excellent password strength!');
  }

  return {
    score,
    feedback: feedback.length > 0 ? feedback : ['Password meets requirements'],
    isValid,
  };
}

/**
 * Get password strength label
 */
export function getPasswordStrengthLabel(score: number): string {
  switch (score) {
    case 0:
      return 'Very Weak';
    case 1:
      return 'Weak';
    case 2:
      return 'Fair';
    case 3:
      return 'Good';
    case 4:
      return 'Strong';
    default:
      return 'Unknown';
  }
}

/**
 * Get password strength color
 */
export function getPasswordStrengthColor(score: number): string {
  switch (score) {
    case 0:
      return 'red';
    case 1:
      return 'orange';
    case 2:
      return 'yellow';
    case 3:
      return 'blue';
    case 4:
      return 'green';
    default:
      return 'gray';
  }
}

/**
 * Generate a strong random password
 */
export function generateStrongPassword(length: number = 16): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = uppercase + lowercase + numbers + special;
  let password = '';
  
  // Ensure at least one character from each category
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}