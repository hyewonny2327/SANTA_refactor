import styles from '../../../styles/gathering/gatheringMain.module.scss';
import SectionTitle from '/src/components/SectionTitle';
import { getMyGatherings } from '/src/services/gatheringApi';
import Thumbnail from '/src/components/Thumbnail';
import { useQuery } from '@tanstack/react-query';

export function MyGatherings() {
  const {
    data: myGatherings,
    isFetched,
    isError,
  } = useQuery({
    queryKey: ['myGatherings'],
    queryFn: async () => {
      const response = await getMyGatherings(0, 3);
      return response.data.content.slice(0, 3).map((gathering) => ({
        id: gathering.meetingId,
        name: gathering.meetingName,
        image: gathering.image,
      }));
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.width100}>
        <SectionTitle
          title="나의 모임"
          subtitle="참여중인 모임을 확인해보세요"
          targetPageUrl="/gathering/participate"
        />
      </div>
      {isFetched && !isError && myGatherings && myGatherings.length > 0 && (
        <Thumbnail data={myGatherings} isHotTopic={false} isIndexChip={false} />
      )}
      {isFetched && !isError && myGatherings && myGatherings.length === 0 && (
        <div className={styles.noGatheringText}>
          참여중인 모임이 없습니다.
          <br />
          새로운 모임에 참여해보세요!
        </div>
      )}
    </div>
  );
}
