import { Button } from '../../components/common/Button';

import AchievementsBox from './components/AchievementsBox';
import CategoryBox from './components/CategotyBox';
import GatheringBox from './components/GatheringBox';
import TrophyBox from './components/TrophyBox';
import styles from './profile.module.scss';
import LoginBtn from './components/LoginBtn';
import kakaoLogo from '/images/kakao.png';
import googleLogo from '/images/google.svg';
import useUserInfoStore from '/src/store/userInfoStore';

export default function ProfilePage() {
  const { userInfo } = useUserInfoStore();
  //유저 권한 => 세션에 토큰이 들어있는지 확인
  const onClick = () => {
    alert('버튼 클릭됨!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <img className={styles.userImg} src={userInfo.image} />
        <div className={styles.userName}>{userInfo.nickname}</div>
        <div className={styles.btn}>
          <Button variant={'rounded-outline'} children={'프로필 수정'} onClick={onClick} />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <TrophyBox />
        <div className={styles.middle}>
          <div className={styles.left}>
            <CategoryBox />
            <GatheringBox />
          </div>
          <div className={styles.right}>
            <AchievementsBox />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <LoginBtn loginType={'kakao'} imgUrl={kakaoLogo} />
        <LoginBtn loginType={'google'} imgUrl={googleLogo} state={'연동하기'} />
        <button className={styles.withdrawalBtn}>회원 탈퇴</button>
      </div>
    </div>
  );
}
