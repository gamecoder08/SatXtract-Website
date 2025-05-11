// components/DismissibleAlert.js
import { useEffect, useState } from 'react';

export default function SuccessMessage({ type = 'success', message, duration = 5000, onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose(); // Optional: tell parent it's closed
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div role="alert" className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Data Sent to Backend SuccessFully!</p>
        </div>
    );
}
