import * as S from "./avatar.styles";

interface AvatarWithStatusProps {
    avatarSrc: string;
    flagSrc?: string;
    isOnline?: boolean;
    tooltipStatus?: string;
    tooltipLastActive?: string;
}

const AvatarWithStatus = ({
    avatarSrc,
    flagSrc,
    isOnline = false,
    tooltipStatus,
    tooltipLastActive,
}: AvatarWithStatusProps) => {
    return (
        <S.AvatarWrapper>
            <S.Avatar src={avatarSrc} alt="Avatar" />
            {flagSrc && <S.FlagIcon src={flagSrc} />}
            <S.Status $online={isOnline} />
            {(tooltipStatus || tooltipLastActive) && (
                <S.CustomTooltip>
                    {tooltipStatus && <S.TooltipStatus>{tooltipStatus}</S.TooltipStatus>}
                    {tooltipLastActive && <S.TooltipLastActive>{tooltipLastActive}</S.TooltipLastActive>}
                </S.CustomTooltip>
            )}
        </S.AvatarWrapper>
    );
};

export default AvatarWithStatus;
