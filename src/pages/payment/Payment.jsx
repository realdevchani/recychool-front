import React, { useMemo, useState } from "react";
import S from "./style";
import PaymentForm from "./PaymentForm";
import PaymentSummary from "./PaymentSummary";

import * as PortOne from "@portone/browser-sdk/v2";

const Payment = () => {
  const [payType, setPayType] = useState("GENERAL");

  // 더미 데이터(테스트용)
  // - reserveId는 서버에서 Reserve 조회/중복체크에 필요하니 임시로 넣어둠
  const user = { name: "홍길동", email: "test@test.com", phone: "010-0000-0000" };
  const school = { name: "동탄초등학교", address: "서울시 강남구" };
  const reserve = {
    id: 2, // ✅ 임시 reserveId
    reserveType: "PARKING",
    startDate: "2026-01-12",
  };

  // 결제 금액(테스트용)
  // 실제로는 서버가 reserve.reservePrice 기준으로 저장/검증하는 게 안전함
  const totalPrice = useMemo(() => {
    return reserve.reserveType === "PARKING" ? 300 : 500;
  }, [reserve.reserveType]);




  const handlePay = async () => {
    try {
      // 1) PortOne 결제창 호출
      const paymentId = `payment-${Date.now()}`;

      const response = await PortOne.requestPayment({
        storeId: "store-c5481931-3202-4119-b7f9-2d877d2e7ef1",
        channelKey: "channel-key-f7346641-df69-43cd-9724-16e58094f5ef",
        paymentId,
        orderName: reserve.reserveType === "PARKING" ? "주차 예약 결제" : "장소 대여 결제",
        totalAmount: totalPrice,
        currency: "KRW",


        payMethod: payType === "GENERAL" ? "CARD" : payType,

        customer: {
          name: user.name,
          email: user.email,
          phoneNumber: user.phone,
        },


      });

      // 결제 성공
      console.log("결제 성공:", response);
      console.log("paymentId:", response?.paymentId);



      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/private/payment/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        
        body: JSON.stringify({
          reserveId: reserve.id,
          impUid: response.paymentId, 
          merchantUid: response.paymentId, 
          paymentType: payType, // PaymentType enum
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`서버 결제 완료 처리 실패: ${res.status} ${text}`);
      }

      const serverData = await res.json();
      console.log("서버 결제 완료 응답:", serverData);

      alert("결제가 완료되었습니다.");
      // TODO: 결제 완료 페이지 이동 / 예약 상세로 이동 등 처리
      // navigate(`/payment/success?paymentId=${response.paymentId}`);
    } catch (error) {
      // 결제 실패 / 취소
      console.error("결제 실패:", error);
      alert("결제가 실패(또는 취소)되었습니다.");
    }
  };

  return (
    <S.Page>
      <S.Grid>
        <S.Left>
          <PaymentForm
            user={user}
            reserve={reserve}
            payType={payType}
            setPayType={setPayType}
          />
        </S.Left>

        <S.Right>
          <PaymentSummary
            school={school}
            reserve={reserve}
            totalPrice={totalPrice}
            onClickPay={handlePay}
          />
        </S.Right>
      </S.Grid>
    </S.Page>
  );
};

export default Payment;
