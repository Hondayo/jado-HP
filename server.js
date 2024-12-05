document.getElementById("contact-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    // 入力データを取得
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };
  
    // 状態表示用のメッセージ要素を取得または作成
    let statusMessage = document.getElementById("status-message");
    if (!statusMessage) {
      statusMessage = document.createElement("p");
      statusMessage.id = "status-message";
      statusMessage.style.textAlign = "center";
      statusMessage.style.marginTop = "1rem";
      document.querySelector(".contact-form-container").appendChild(statusMessage);
    }
  
    // ローディングメッセージを表示
    statusMessage.textContent = "送信中です...";
    statusMessage.style.color = "#007BFF";
  
    try {
      // データをバックエンドに送信
      const response = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // 成功時のアクション
        statusMessage.textContent = "お問い合わせ内容が送信されました！";
        statusMessage.style.color = "green";
        document.getElementById("contact-form").reset(); // フォームをリセット
      } else {
        // 失敗時のアクション
        throw new Error(data.message || "送信に失敗しました。");
      }
    } catch (error) {
      // エラー時のアクション
      statusMessage.textContent = `エラー: ${error.message}`;
      statusMessage.style.color = "red";
    }
  });
  