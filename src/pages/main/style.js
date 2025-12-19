import styled from "styled-components";
import { h5Bold, h5Medium, h6Bold, h6Medium, h7Bold, h7Medium, h8Light, h8Medium } from "../../styles/common";
import { Link } from "react-router-dom";


const S = {};


S.MainWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

S.BannerWrap = styled.div`
    background:
        url('/assets/images/mainbackground.png') bottom center / 1900px auto no-repeat,
        url('/assets/images/main.png') top center /  1900px auto no-repeat;
    min-height: 930px;     
    padding-top: 50px;
    padding-bottom: 180px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`

S.ContentRow = styled.div`
    width: 1400px;
    display: flex;
`

S.MapPane = styled.div`
    flex: 0 0 494px;   
    height: 590px;
    border-radius: 16px;
    overflow: hidden;
`;
S.SidePane = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

S.InfoCard = styled.div`
    width: 330px;
    height: 390px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 18px 40px rgba(0,0,0,0.15);
`
S.InfoHeaderWrap = styled.div`
    display: flex;
`
S.InfoHeaderLeft = styled.div`
    width: 34px;
    height: 30px;
    margin: 20px 0px 0px 16px;
    border-radius: 5px;
    background-color: #C89A9A;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 20px;
        height: 20px;

    }
`
S.InfoCardMiddleWrap = styled.div`
    margin: 16px 0px 0px 0px;
    display: flex;
    justify-content: center;
    img {
        width: 296px;
        height: 135px;
    }
`
S.InfoCardFloorWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px 0px 0px 16px;
    ${h6Medium}
`
S.InfoCardTitleWrap = styled.div`
    ${h5Bold}
`
S.InfoCardAddressWrap = styled.div`
    display: flex;
    align-items: center;
    color: #666666;
    gap: 13px;
    img {
        width: 11px;
        height: 15px;
    }
`
S.InfoCardPhoneNumberWrap = styled.div`
    display: flex;
    align-items: center;
    color: #666666;
    gap: 13px;
    img {
        width: 9px;
        height: 15px;
    }
`

S.InfoCardFooterWrap = styled.div`
    margin: 16px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    ${h6Bold}
`
S.InfoCardFooterParking = styled(Link)`
    width: 105px;
    height: 42px;
    border-radius: 30px;
    background-color: #EFFBEA;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
`
S.InfoCardFooterPlace = styled(Link)`
    width: 105px;
    height: 42px;
    border-radius: 30px;
    background-color: #70C60C;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
        color: #FFFFFF;
    }
`

S.IsClosedSchoolWrap = styled.div`
    display: flex;
    align-items: center;
    width: 330px;
    height: 61px;
    background-color: #FFFFFF;
    margin: 35px 0 0 0;
    border-radius: 18px;
    gap: 12px;
    ${h6Bold}
    img {
        width: 18px;
        height: 18px;
        margin: 22px 0px 22px 22px;
    }
`

S.SearchWrap = styled.div`
    position: absolute;
    top: 100%;
    width: 850px;
    height: 66px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0px 12px;
    box-sizing: border-box;
    border: 1px solid #DDDDDD;
    border-radius: 50px;
    background: #ffffff;
`;

S.FieldItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: 15px 32px 0;
    label {
        ${h8Light}
        line-height: 2px;
        color: #222222;
    }

    input {
        width: 100%;
        height: 34px;
        border: none;
        outline: none;
        color: #6A6A6A;
        background: transparent;
        padding: 0;
        box-sizing: border-box;
        ${h7Medium}
    }
`;

S.Divider = styled.div`
    width: 1px;
    height: 40%;
    background: #F0F0F0;
`;

S.SearchButton = styled.button`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #70C60C;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    box-shadow: none;

    img {
        width: 20px;
        height: 20px;
    }
`;

S.CategoryParkingWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

S.CategoryPlaceWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 45px;
`

S.CategoryTitleWrap = styled.div`
    width: 1160px;
    display: flex;
    margin-bottom: 20px;
    ${h5Medium}
`
S.CategoryMiddleWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
S.CategoryImageWrap = styled.div`
    width: 1160px;
    display: flex;
    justify-content: space-between;
`
S.CategoryImages = styled(Link)`
    display: flex;
    flex-direction: column;
    img {
        width: 250px;
        height: 237px;
        border-radius: 20px;
    }
`
S.CategoryImageTitle = styled.p`
    ${h7Bold}
`
S.CategoryImageDate = styled.p`
    ${h8Medium}
    line-height: 16px;
`
S.CategoryImagePrice = styled.p`
    ${h8Medium}
`

export default S;