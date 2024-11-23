$(document).ready(() => {
  const LIFF_ID = "2006595568-G8n5EVbN"; // 替換為你的 LIFF ID

  // 初始化 LIFF
  liff
    .init({ liffId: LIFF_ID })
    .then(() => {
      if (!liff.isLoggedIn()) {
        liff.login(); // 將使用者引導登入
      }
    })
    .catch((err) => {
      console.error("LIFF 初始化失敗:", err);
    });

  // 點擊按鈕進入活動
  $("#start-liff").on("click", () => {
    $("#lottery").show();
    $("#start-liff").hide();
  });

  $("#spin-wheel").on("click", () => {
    const prizes = [
      { name: "獎項A", message: "恭喜獲得獎項A!" },
      { name: "獎項B", message: "恭喜獲得獎項B!" },
      { name: "獎項C", message: "恭喜獲得獎項C!" },
      { name: "獎項D", message: "恭喜獲得獎項D!" },
      { name: "獎項E", message: "恭喜獲得獎項E!" },
      { name: "再接再厲", message: "很遺憾，請再試一次！" },
    ];

    // 隨機選擇結果
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const baseAngle = 360 / prizes.length;
    const spinCount = 5; // 總旋轉圈數
    const targetAngle =
      spinCount * 360 + randomIndex * baseAngle + baseAngle / 2;

    // 旋轉轉盤
    $("#wheel").css("transform", `rotate(${targetAngle}deg)`);

    // 顯示結果
    setTimeout(() => {
      const reward = prizes[randomIndex];
      //   $("#lottery").hide();
      $("#result").show();
      $("#reward-message").text(reward.message);

      // 傳送獎勵
      $("#send-reward").on("click", () => {
        liff
          .sendMessages([
            {
              type: "text",
              text: reward.message,
            },
          ])
          .then(() => {
            alert("已成功傳送獎勵!");
            liff.closeWindow();
          })
          .catch((err) => {
            console.error("傳送訊息失敗:", err);
          });
      });
    }, 5000);
  });

  $("#share-activity").on("click", () => {
    liff
      .shareTargetPicker([
        {
          type: "text",
          text: "快來參加這個超有趣的抽獎活動！",
        },
      ])
      .catch((err) => {
        console.error("分享失敗:", err);
      });
  });
});
