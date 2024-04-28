import React, { useState } from 'react';
import axios from 'axios'; // axios 라이브러리 설치 필요

function ChatButton() {
    const [message, setMessage] = useState('');
    const [buttonText, setButtonText] = useState('Get Message');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const fetchMessage = async () => {
        setButtonText('생성중...');
        setIsButtonDisabled(true);  // 버튼 비활성화
        
        try {
            const response = await axios.post('https://5aizbqy5veo5fcej4ryiyptehu0zcftf.lambda-url.us-east-2.on.aws/', {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_API_KEY"
            });
            const content = response.data.choices[0].message.content;
            let decodedMessage = '';
            try {
                decodedMessage = decodeURIComponent(escape(content));
            } catch (e) {
                console.error('Decoding error:', e);
                decodedMessage = 'Decoding failed. Original message: ' + content;
            }

            setMessage(prevMessage => prevMessage + "\n" + response.data.choices[0].message.content);
            setButtonText('Get Message');  // 버튼 텍스트 복구
            setIsButtonDisabled(false);   // 버튼 활성화
        } catch (error) {
            console.error('Error fetching message:', error);
            setMessage(prevMessage => prevMessage + "\nFailed to fetch message.");
            setButtonText('Get Message');  // 에러 시 버튼 텍스트 복구
            setIsButtonDisabled(false);   // 버튼 활성화
        }
    }

    return (
        <div>
            <button onClick={fetchMessage} disabled={isButtonDisabled}>
                {buttonText}
            </button>
            <br/>
            <a>{message}</a>
        </div>
    );
}

export default ChatButton;
