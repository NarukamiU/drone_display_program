document.addEventListener('DOMContentLoaded', () => {
    // 色のマップを定義
    const colors = {
        red: 'red',
        blue: 'blue',
        green: 'green',
        yellow: 'yellow',
        cyan: 'cyan',
        white: 'white',
        black: 'black',//停止
        lime: 'lime' //ドローン初期位置調整
    };

    let isRunning = false; // 処理が実行中かどうかを示すフラグ

    // 色を変更する関数
    function changeColor(seconds, color) {
        return new Promise((resolve) => {
            if (!isRunning) return; // 処理が中断された場合はresolveしない
            // 指定した色に変更
            document.body.style.backgroundColor = colors[color];

            // 指定秒数後に黒に変更
            setTimeout(() => {
                if (!isRunning) return; // 処理が中断された場合はresolveしない
                document.body.style.backgroundColor = colors.black; // 黒に変更
                resolve(); // Promiseを解決して次の処理へ進む
            }, seconds * 1000);
        });
    }

    // 連続して色を変更する処理
    async function changeColorsSequentially() {
        isRunning = true;
        await changeColor(2, 'red'); // 赤色を2秒間表示
        await changeColor(3, 'blue'); // 青色を3秒間表示
        await changeColor(2, 'yellow'); // 黄色を2秒間表示
        isRunning = false;
    }

    // ボタンクリック時の処理
    document.getElementById('startButton').addEventListener('click', () => {
        // 処理を開始
        changeColorsSequentially();
    });

    // 「緊急停止」ボタンクリック時の処理
    document.getElementById('stopButton').addEventListener('click', () => {
        isRunning = false; // 処理を中断し、背景色を黒に設定
        document.body.style.backgroundColor = colors.black;
    });

    // 「初期状態に戻す」ボタンクリック時の処理
    document.getElementById('resetButton').addEventListener('click', () => {
        isRunning = false; // 処理を中断
        document.body.style.backgroundColor = colors.lime; // 初期状態に戻す（黄緑色）
    });

    // 初期状態で黄緑色を表示
    document.body.style.backgroundColor = colors.lime;
});
