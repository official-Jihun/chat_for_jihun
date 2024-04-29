import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.css'; // 스타일 모듈 불러오기

function ChatButton() {
    const [messages, setMessages] = useState([]);
    const [buttonText, setButtonText] = useState('Get Message');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    // 랜덤 색상 선택
    const getRandomColor = () => {
        const colors = [
            "#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff",
            "#f2c2e0", "#c2f2d0", "#f2efc2", "#f2d0c2", "#c2c2f2"
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const getTextColor = (backgroundColor) => {
        // 배경색에서 R, G, B 값을 추출
        const color = backgroundColor.substring(1); // '#' 제거
        const rgb = parseInt(color, 16); // 16진수를 정수로 변환
        const red = (rgb >> 16) & 0xff;
        const green = (rgb >> 8) & 0xff;
        const blue = (rgb >> 0) & 0xff;

        // 밝기 계산
        const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

        // 밝기가 기준보다 높으면 검은색, 낮으면 흰색 반환
        return brightness > 128 ? '#333' : '#fff'; // 128은 일반적인 중간값입니다.
    };

    const fetchMessage = async () => {
        setButtonText('Creating...');
        setIsButtonDisabled(true);
        
        try {
            const response = await axios.post('https://qfe2tkmf7ci5sjlk5i3ufw4vqy0tjcoh.lambda-url.ap-northeast-2.on.aws/', {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_API_KEY"
            });
            const content = response.data.choices[0].message.content;
            let decodedMessage = content;
            try {
                decodedMessage = decodeURIComponent(escape(content));
            } catch (e) {
                console.error('Decoding error:', e);
            }
            setMessages(prevMessages => [...prevMessages, { text: decodedMessage, color: getRandomColor() }]);
            setButtonText('Get Message');
            setIsButtonDisabled(false);
            
        } catch (error) {
            console.error('Error fetching message:', error);
            // setMessages(prevMessages => [...prevMessages, { text: "Failed to fetch message.", color: getRandomColor() }]);
            setButtonText('Get Message');
            setIsButtonDisabled(false);
        }
    }

    return (
        <div>
            <button onClick={fetchMessage} disabled={isButtonDisabled}>
                {buttonText}
            </button>
            <br/>
            <div style={{ marginTop: '20px',  overflow: 'visible' }}> {/* 메시지 박스 사이 간격 조정 */}
                {messages.map((msg, index) => (
                    <div key={index} className={styles.messageItem} style={{ backgroundColor: msg.color, color: getTextColor(msg.color) }}>
                        {msg.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatButton;
