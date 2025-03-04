import React, { useState, useEffect, useRef } from 'react';

const Table = () => {
  const canvasRef = useRef(null);
  const [balls, setBalls] = useState([
    { x: 100, y: 100, radius: 15, color: 'white' },
    { x: 200, y: 100, radius: 15, color: 'red' },
    { x: 300, y: 100, radius: 15, color: 'blue' },
  ]);

  const cueStickImg = new Image();
  cueStickImg.src = '/cue-stick.png'; // Đảm bảo đường dẫn đúng

  const ballImages = [
    new Image(),
    new Image(),
    new Image(),
  ];
  ballImages[0].src = '/ball1.png';  // Bi 1
  ballImages[1].src = '/ball2.png';  // Bi 2
  ballImages[2].src = '/ball3.png';  // Bi 3

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Kiểm tra tất cả các hình ảnh đã tải xong
    let imagesLoaded = 0;
    const totalImages = 4; // 1 hình cây cơ + 3 hình bi

    const checkImagesLoaded = () => {
      imagesLoaded += 1;
      if (imagesLoaded === totalImages) {
        // Vẽ khi tất cả hình ảnh đã tải
        draw();
      }
    };

    // Lắng nghe sự kiện onLoad để biết khi hình ảnh đã tải xong
    cueStickImg.onload = checkImagesLoaded;
    ballImages[0].onload = checkImagesLoaded;
    ballImages[1].onload = checkImagesLoaded;
    ballImages[2].onload = checkImagesLoaded;

    // Hàm vẽ bàn và các đối tượng
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);  // Xóa canvas trước khi vẽ lại
      drawTable();
      drawBalls();
      drawCueStick();
    };

    // Vẽ bàn bida
    const drawTable = () => {
      ctx.fillStyle = '#008000';  // Màu bàn bida
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#654321'; // Màu viền bàn
      ctx.lineWidth = 10;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };

    // Vẽ các bi
    const drawBalls = () => {
      balls.forEach((ball, index) => {
        const ballImg = ballImages[index];

        // Kiểm tra xem hình ảnh đã tải chưa
        if (ballImg.complete && ballImg.naturalWidth !== 0) {
          ctx.drawImage(ballImg, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
        } else {
          console.error('Hình ảnh không hợp lệ:', ballImg.src);
        }
      });
    };

    // Vẽ cây cơ
    const drawCueStick = () => {
      ctx.save();
      ctx.translate(150, 300); // Vị trí gốc của cây cơ
      ctx.rotate(Math.PI / 4); // Xoay cây cơ (thay đổi góc theo nhu cầu)
      ctx.drawImage(cueStickImg, -100, -5, 100, 10); // Vẽ cây cơ
      ctx.restore();
    };

  }, [balls]); // Thêm dependency array để chỉ chạy lại khi `balls` thay đổi

  return (
    <div className="w-full h-full flex justify-center items-center">
      <canvas ref={canvasRef} width={800} height={400} className="border-2 border-gray-900" />
    </div>
  );
};

export default Table;
