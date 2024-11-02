import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 200 },
    { duration: "20s", target: 230 },
    { duration: "20s", target: 300 },
    { duration: "10s", target: 400 },
    { duration: "20s", target: 0 }, // ค่อย ๆ ลดจำนวน VUs ลงเหลือ 0
  ],
};

export default function () {
  // ข้อมูล login เช่น username และ password
  const payload = JSON.stringify({
    email: "eamil@eemre.ocom",
    password: "123121233",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // ส่ง POST Request ไปยัง endpoint สำหรับ login
  let res = http.post("https://api.iaaaiksu.com/api/login", payload, params);

  // ตรวจสอบว่าข้อความตอบกลับคือ 'Login Successful'
  check(res, {
    "login success message": (r) => r.body.includes("Login Successful"),
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}
