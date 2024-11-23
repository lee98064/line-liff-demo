$(document).ready(function () {
  const tasks = [
    {
      code: "QR123",
      hint: "前往圖書館找一本綠色封面的書。",
      img: "./img/Q1.jpg",
    },
    {
      code: "QR456",
      hint: "到操場找紅色長椅下的線索。",
      img: "./img/Q2.jpg",
    },
    {
      code: "QR789",
      hint: "回到起點，與工作人員對話。",
      img: "./img/Q3.jpg",
    },
  ];

  let currentTask = 0;

  // 初始化 LIFF
  const initializeLiff = async () => {
    try {
      await liff.init({ liffId: "2006595568-G8n5EVbN" }); // 替換為你的 LIFF ID
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    } catch (error) {
      alert("LIFF 初始化失敗：" + error.message);
    }
  };

  initializeLiff();

  // 點擊掃描 QR Code
  $("#scan-qr").click(async function () {
    if (!liff.isInClient()) {
      alert("請在 LINE APP 中打開此遊戲以使用 QR Code 掃描功能！");
      return;
    }

    try {
      const result = await liff.scanCodeV2();
      const scannedCode = result.value; // 掃描到的 QR Code 資料
      checkQRCode(scannedCode);
    } catch (error) {
      alert("掃描失敗：" + error.message);
    }
  });

  // 檢查 QR Code 是否正確
  function checkQRCode(code) {
    if (currentTask >= tasks.length) {
      $("#status").hide();
      $("#hint").hide();
      $("#game-over").show();
      return;
    }

    const task = tasks[currentTask];
    if (code === task.code) {
      $("#status").text("成功解鎖！請看提示。");
      $("#hint").show();
      $("#hint-text").text(task.hint);

      if (task.img) {
        $("#hint-image").attr("src", task.img).show();
      } else {
        $("#hint-image").hide();
      }

      currentTask++;
      if (currentTask >= tasks.length) {
        $("#status").hide();
        $("#hint").hide();
        $("#game-over").show();
      }
    } else {
      alert("QR Code 不正確，請再試一次！");
    }
  }
});
