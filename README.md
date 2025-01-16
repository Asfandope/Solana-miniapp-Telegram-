# Solana Wallet Connection for Telegram Mini-App

A fallback solution for connecting Phantom wallets to Telegram mini-apps when direct connection fails. This implementation provides an external webpage that handles wallet connections smoothly and securely.

## Features

- External wallet connection page
- Fallback mechanism for failed direct connections
- Styled interface matching main app
- Secure communication between windows
- Automatic error handling and user feedback

## Implementation

### Key Components

1. **External Connection Page** (`public/phantom-connect.html`)
   - Handles Phantom wallet detection
   - Manages wallet connections
   - Provides user feedback
   - Styled to match main application

2. **Wallet Connection Component** (`src/components/WalletConnect.tsx`)
   - Manages connection workflow
   - Handles fallback scenarios
   - Controls popup window
   - Processes wallet responses

3. **Configuration** (`src/config/wallet.config.ts`)
   - External connection URL
   - API endpoint settings

## Usage

1. User clicks "Connect" in the Telegram mini-app
2. System attempts direct wallet connection
3. If direct connection fails:
   - External window opens automatically
   - User connects wallet through external page
   - Window closes after successful connection
   - User returns to mini-app with connected wallet

## Installation

```bash
# Clone the repository
git clone https://github.com/Asfandope/Solana-miniapp-Telegram-

# Install dependencies
npm install

# Build the project
npm run build
```

## Testing

1. Visit the Telegram mini-app
2. Attempt wallet connection
3. Verify fallback mechanism
4. Test error scenarios

## Live Demo

- Main App: https://lightslategray-armadillo-425266.hostingersite.com
- External Connection: https://lightslategray-armadillo-425266.hostingersite.com/phantom-connect.html

## License

MIT

## Author

Asfand