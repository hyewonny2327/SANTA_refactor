import styles from '../../../styles/gathering/gatheringMain.module.scss';
import SectionTitle from '/src/components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import { getPopularGatherings } from '/src/services/gatheringApi';
import Thumbnail from '/src/components/Thumbnail';
export function Top3Gatherings() {
  const {
    data: top3Gatherings,
    isFetched,
    isError,
  } = useQuery({
    queryKey: ['top3Gatherings'],
    queryFn: async () => {
      const response = await getPopularGatherings(0, 3);
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
        <SectionTitle title="인기 모임" subtitle="산타의 인기 모임을 확인해보세요" />
      </div>
      {isFetched && !isError && top3Gatherings && top3Gatherings.length > 0 && (
        <Thumbnail data={top3Gatherings} isHotTopic={false} isIndexChip={false} />
      )}
      {isFetched && !isError && top3Gatherings && top3Gatherings.length === 0 && (
        <div className={styles.noGatheringText}>
          참여중인 모임이 없습니다.
          <br />
          새로운 모임에 참여해보세요!
        </div>
      )}
    </div>
  );
}
