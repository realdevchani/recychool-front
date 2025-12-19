import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setUser, setUserStatus } from '../../modules/user';
import S from './style';
import KakaoMap from './map/KakaoMap';

const Main = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const key = searchParams.get('key');

  useEffect(() => {
    if (key) {
      const getAccessToken = async () => {
        try {
          const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/oauth2/success?key=${key}`;

          const response = await fetch(apiUrl, {
            method: 'GET',
          });

          if (!response.ok) {
            const result = await response.json();
            alert(result.message || 'OAuth 인증에 실패했습니다.');
            window.history.replaceState({}, '', '/');
            return;
          }

          const datas = await response.json();
          const accessToken = datas.data?.accessToken;
          const userData = datas.data?.user;

          if (accessToken) {
            try {
              localStorage.setItem('accessToken', accessToken);

              const immediateCheck = localStorage.getItem('accessToken');
              if (!immediateCheck) {
                alert('토큰 저장에 실패했습니다. 브라우저 설정을 확인해주세요.');
                return;
              }
            } catch (storageError) {
              alert('토큰 저장 중 오류가 발생했습니다: ' + storageError.message);
              return;
            }

            dispatch(setUserStatus(true));

            if (userData) {
              const formattedUserData = {
                id: userData.id || userData.userId || 0,
                userName: userData.userName || userData.name || "",
                userBirthday: userData.userBirthday || userData.birthday || new Date(),
                userEmail: userData.userEmail || userData.email || "",
                userPhone: userData.userPhone || userData.phone || "",
                userExp: userData.userExp || userData.exp || 0,
                userLevel: userData.userLevel || userData.level || 0,
                userThumbnailName: userData.userThumbnailName || userData.thumbnailName || "",
                userThumbnailUrl: userData.userThumbnailUrl || userData.thumbnailUrl || "",
                userNickname: userData.userNickname || userData.nickname || "",
                userProvider: userData.userProvider || userData.provider || "",
              };
              dispatch(setUser(formattedUserData));
            }

            window.history.replaceState({}, '', '/');
          } else {
            alert('토큰을 받아오지 못했습니다.');
            window.history.replaceState({}, '', '/');
          }
        } catch (error) {
          alert('OAuth 인증 중 오류가 발생했습니다: ' + error.message);
          window.history.replaceState({}, '', '/');
        }
      };

      getAccessToken();
    }
  }, [key, dispatch, searchParams]);

  return (
    <div>

      <S.MainWrap>
        <S.BannerWrap>
          <S.ContentRow>
            <S.MapPane>
              <KakaoMap />
            </S.MapPane>

            <S.SidePane>
              <S.InfoCard>
                {/* 인포카드 헤더 */}
                <S.InfoHeaderWrap>
                  <S.InfoHeaderLeft>
                    <img src="/assets/images/pluss.png" alt="플러스 아이콘" />
                  </S.InfoHeaderLeft>
                </S.InfoHeaderWrap>
                {/* 인포카드 중앙사진 */}
                <S.InfoCardMiddleWrap>
                  <img src='/assets/images/schoolsample.png' alt='미원초엄소분교장 1'></img>
                </S.InfoCardMiddleWrap>
                {/* 인포카드 학교정보보 */}
                <S.InfoCardFloorWrap>
                  <S.InfoCardTitleWrap><p>미원초엄소분교장</p></S.InfoCardTitleWrap>
                  <S.InfoCardAddressWrap> <img src="/assets/images/marker.png" alt="학교 주소" /><p>경기도 가평군 북면 가화로 1059</p> </S.InfoCardAddressWrap>
                  <S.InfoCardPhoneNumberWrap> <img src="/assets/images/phone.png" alt="학교 전화번호" /><p>031-580-5132</p> </S.InfoCardPhoneNumberWrap>
                </S.InfoCardFloorWrap>
                <S.InfoCardFooterWrap>
                  <S.InfoCardFooterParking to={'/sign-up'}><p>주차예약</p></S.InfoCardFooterParking>
                  <S.InfoCardFooterPlace to={'/'}><p>장소예약</p></S.InfoCardFooterPlace>
                </S.InfoCardFooterWrap>
              </S.InfoCard>
              <S.IsClosedSchoolWrap><img src='/assets/images/pink.png' alt='분홍점' /><p>폐교</p></S.IsClosedSchoolWrap>

            </S.SidePane>


            <S.SearchWrap>
              <S.FieldItem>
                <label>지역</label>
                <input type="text" placeholder="서울/경기도" />
              </S.FieldItem>

              <S.Divider />
              <S.FieldItem>
                <label>날짜</label>
                <input type="text" placeholder="날짜 추가" />
              </S.FieldItem>

              <S.Divider />
              <S.FieldItem>
                <label>학교</label>
                <input type="text" placeholder="학교명 검색" />
              </S.FieldItem>

              <S.SearchButton aria-label="검색" > <img src="/assets/images/schoolsearch.png" alt="검색버튼" /> </S.SearchButton>
            </S.SearchWrap>
          </S.ContentRow>
        </S.BannerWrap>


        <S.CategoryParkingWrap>
          <S.CategoryTitleWrap><p>현재 주차 가능한 학교</p></S.CategoryTitleWrap>
        </S.CategoryParkingWrap>
        <S.CategoryMiddleWrap>
          <S.CategoryImageWrap>
            <S.CategoryImages to={'/'}>
              <img src='/assets/images/sample1.png' alt='샘플데이터' />
              <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
              <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
              <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
            </S.CategoryImages>
            <S.CategoryImages to={'/'}>
              <img src='/assets/images/sample2.png' alt='샘플데이터' />
              <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
              <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
              <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
            </S.CategoryImages>
            <S.CategoryImages to={'/'}>
              <img src='/assets/images/sample3.png' alt='샘플데이터' />
              <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
              <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
              <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
            </S.CategoryImages>
            <S.CategoryImages to={'/'}>
              <img src='/assets/images/sample4.png' alt='샘플데이터' />
                <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
              <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
              <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
            </S.CategoryImages>
          </S.CategoryImageWrap>
        </S.CategoryMiddleWrap>

        <S.CategoryPlaceWrap>
          <S.CategoryTitleWrap><p>현재 장소대여 가능한 학교</p></S.CategoryTitleWrap>
        </S.CategoryPlaceWrap>
        <S.CategoryMiddleWrap>
          <S.CategoryImageWrap>
            <S.CategoryImages to={'/'}>
              <img src='/assets/images/sample1.png' alt='샘플데이터' />
              <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
              <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
              <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
            </S.CategoryImages>
            <S.CategoryImages to={'/'}>
              <img src='/assets/images/sample2.png' alt='샘플데이터' />
              <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
              <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
              <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
            </S.CategoryImages>
            <S.CategoryImages to={'/'}>
              <img src='/assets/images/sample3.png' alt='샘플데이터' />
              <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
              <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
              <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
            </S.CategoryImages>
            <S.CategoryImages to={'/'}>
              <img src='/assets/images/sample4.png' alt='샘플데이터' />
              <S.CategoryImageTitle>동탄 초등학교</S.CategoryImageTitle>
              <S.CategoryImageDate>3월 1일~29일</S.CategoryImageDate>
              <S.CategoryImagePrice>₩ 100,000</S.CategoryImagePrice>
            </S.CategoryImages>
          </S.CategoryImageWrap>
        </S.CategoryMiddleWrap>
      </S.MainWrap>

    </div>
  );
};

export default Main;