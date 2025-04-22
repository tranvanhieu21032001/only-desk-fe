import { Image } from "antd";
import { notifications } from "@/core/settings/options";

import * as S from "./inbox-list.styles";

import search from "@/assets/icons/common/ic-search.svg";
import filter from "@/assets/icons/common/ic-filter.svg";
import arrowDown from "@/assets/icons/common/ic-arrow-down.svg";

const NotificationList = () => {
  return (
    <S.Container>
      <S.SearchFilterWrapper>
        <S.SearchInputWrapper>
          <Image src={search} alt="Search icon" preview={false} />
          <S.SearchInput placeholder="Search..." />
        </S.SearchInputWrapper>
        <S.Button>
          <Image src={filter} alt="Filter icon" preview={false} /> Filter
        </S.Button>
        <S.Button>
          <Image src={arrowDown} alt="Arrow down icon" preview={false} /> All
        </S.Button>
      </S.SearchFilterWrapper>

      {notifications.map((n) => (
        <S.NotificationItem key={n.id}>
          <S.Avatar src={n.avatar} alt={n.title} />
          <S.Content>
            <S.Title>{n.title}</S.Title>
            <S.Subtitle>{n.subtitle}</S.Subtitle>
          </S.Content>
          <S.RightSection>
            <S.Time>{n.time}</S.Time>
            {n.badge && <S.Badge>{n.badge}</S.Badge>}
          </S.RightSection>
        </S.NotificationItem>
      ))}
    </S.Container>
  );
};

export default NotificationList;
