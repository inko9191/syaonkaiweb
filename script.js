// ==========================================
// クラシック・ビンテージ風 謝恩会招待状サイト
// 不思議の国のアリステーマ
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // パスワード保護機能
    // ==========================================
    const PASSWORD = 'chuouniv2025';
    const passwordScreen = document.getElementById('passwordScreen');
    const passwordInput = document.getElementById('passwordInput');
    const passwordSubmit = document.getElementById('passwordSubmit');
    const passwordError = document.getElementById('passwordError');
    const mainContent = document.getElementById('mainContent');

    // セッションストレージで認証状態を確認
    if (sessionStorage.getItem('authenticated') === 'true') {
        passwordScreen.classList.add('hidden');
        mainContent.style.display = 'block';
    } else {
        mainContent.style.display = 'none';
    }

    // パスワード検証
    function checkPassword() {
        const inputPassword = passwordInput.value;
        
        if (inputPassword === PASSWORD) {
            // 正しいパスワード
            sessionStorage.setItem('authenticated', 'true');
            passwordScreen.style.animation = 'fadeOut 0.5s ease-out';
            
            setTimeout(() => {
                passwordScreen.classList.add('hidden');
                mainContent.style.display = 'block';
                mainContent.style.animation = 'fadeIn 0.8s ease-out';
            }, 500);
            
            // 成功のパーティクルエフェクト
            for (let i = 0; i < 50; i++) {
                const x = window.innerWidth / 2;
                const y = window.innerHeight / 2;
                setTimeout(() => {
                    particles.push(new Particle(x, y));
                }, i * 10);
            }
        } else {
            // 間違ったパスワード
            passwordError.textContent = '合言葉が違います。もう一度お試しください。';
            passwordInput.value = '';
            passwordInput.style.animation = 'shake 0.5s';
            
            setTimeout(() => {
                passwordInput.style.animation = '';
                passwordError.textContent = '';
            }, 2000);
        }
    }

    // ボタンクリック
    passwordSubmit.addEventListener('click', checkPassword);

    // Enterキーで送信
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // シェイクアニメーション
    if (!document.getElementById('password-shake-style')) {
        const style = document.createElement('style');
        style.id = 'password-shake-style';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    transform: scale(0.9);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // メインコンテンツ（既存のコード）
    // ==========================================
    // キャンバスの設定
    const canvas = document.getElementById('magicCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // パーティクルの配列
    let particles = [];

    // クラシックなパーティクルクラス
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 4 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = this.randomColor();
            this.life = 100;
            this.decay = Math.random() * 1.5 + 0.5;
            this.symbol = this.randomSymbol();
        }

        randomColor() {
            const colors = [
                '#000000',  // 黒
                '#8B0000',  // ダークレッド
                '#2d2d2d',  // ダークグレー
                '#FFFFFF',  // 白
                '#4a4a4a'   // グレー
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        randomSymbol() {
            const symbols = ['♠', '♥', '♣', '♦', '•', '◆', '▪'];
            return symbols[Math.floor(Math.random() * symbols.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            if (this.size > 0.2) this.size -= 0.03;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.life / 100;
            ctx.fillStyle = this.color;
            ctx.font = `${this.size * 8}px Arial`;
            ctx.fillText(this.symbol, this.x, this.y);
            ctx.restore();
        }
    }

    // アニメーションループ
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // パーティクルの更新と描画
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // 寿命が尽きたパーティクルを削除
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(animate);
    }

    animate();

    // クリックイベント - クラシックなエフェクト
    document.addEventListener('click', function(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        // パーティクルを生成（控えめに）
        for (let i = 0; i < 15; i++) {
            particles.push(new Particle(x, y));
        }
        
        // リップルエフェクト
        createVintageRipple(x, y);
    });

    // ビンテージ風リップルエフェクト
    function createVintageRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.borderRadius = '50%';
        ripple.style.border = '2px solid rgba(139, 0, 0, 0.6)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '10000';
        ripple.style.animation = 'rippleEffect 1s ease-out';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    // リップルアニメーションのCSS追加
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes rippleEffect {
                0% {
                    width: 10px;
                    height: 10px;
                    opacity: 1;
                }
                100% {
                    width: 150px;
                    height: 150px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 観察対象の要素を設定
    const animateElements = document.querySelectorAll('.info-card, .message-box');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // 控えめなキラキラエフェクト（トランプのマーク）
    setInterval(() => {
        if (Math.random() > 0.5) { // 50%の確率で発生
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            for (let i = 0; i < 2; i++) {
                particles.push(new Particle(x, y));
            }
        }
    }, 3000);

    // ページロード時のウェルカムエフェクト
    window.addEventListener('load', function() {
        setTimeout(() => {
            // 中央からのクラシックなエフェクト
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 3;
            
            for (let i = 0; i < 40; i++) {
                setTimeout(() => {
                    particles.push(new Particle(centerX, centerY));
                }, i * 20);
            }
        }, 800);
    });

    // イースターエッグ: 白ウサギモード（Konami Code風）
    let secretCode = [];
    const secretSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
    
    document.addEventListener('keydown', function(e) {
        secretCode.push(e.key);
        secretCode.splice(-secretSequence.length - 1, secretCode.length - secretSequence.length);
        
        if (secretCode.join('').includes(secretSequence.join(''))) {
            activateWhiteRabbitMode();
            secretCode = [];
        }
    });

    function activateWhiteRabbitMode() {
        // 白ウサギの緊急モード！
        const rabbitAlert = document.createElement('div');
        rabbitAlert.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #000;
            color: #fff;
            padding: 40px 50px;
            border: 5px solid #8B0000;
            box-shadow: 0 0 50px rgba(139, 0, 0, 0.8);
            z-index: 100000;
            text-align: center;
            font-size: 1.5rem;
            animation: shake 0.5s infinite;
        `;
        
        rabbitAlert.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 15px;">⏰🐇</div>
            <p style="font-family: 'Noto Serif JP', serif; font-weight: 700; letter-spacing: 0.2em;">
                遅刻する！遅刻する！<br>
                大変だ！大変だ！
            </p>
        `;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 99999;
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(rabbitAlert);
        
        // シェイクアニメーション
        if (!document.getElementById('shake-style')) {
            const style = document.createElement('style');
            style.id = 'shake-style';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
                    25% { transform: translate(-50%, -50%) rotate(-2deg); }
                    75% { transform: translate(-50%, -50%) rotate(2deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // 大量のトランプカード
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            particles.push(new Particle(x, y));
        }
        
        setTimeout(() => {
            rabbitAlert.remove();
            overlay.remove();
        }, 3000);
    }

    // マウスホバー時のエフェクト（カードに）
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            for (let i = 0; i < 5; i++) {
                particles.push(new Particle(x, y));
            }
        });
    });

    console.log('%c🎩 Welcome to Wonderland 🐇', 'font-size: 18px; color: #8B0000; font-weight: bold; background: #f5f5dc; padding: 10px;');
    console.log('%c隠しコマンド: ↑↑↓↓ で白ウサギが登場！', 'font-size: 14px; color: #2d2d2d;');
});
