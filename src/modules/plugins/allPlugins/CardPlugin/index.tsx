import { Image, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, EyeOutlined, SettingFilled } from "@ant-design/icons";

import { CardPluginInterface } from "../../model/allPlugins";
import fontWeight from "@/shared/styles/themes/default/fontWeight";
import { PluginsStatusEnums } from "../../helper/enums/allPlugins";

import Typography from "@/shared/components/common/Typography";

import * as S from "./card-plugin";

import icImageDefault from "@/assets/icons/common/ic-image-default.jpeg";
import themeColors from "@/shared/styles/themes/default/colors";

interface CardPluginProps {
    isLoading?: boolean;
    card: CardPluginInterface
}

function CardPlugin({ isLoading, card }: CardPluginProps) {
    const { t } = useTranslation("plugins");

    function handleViewDetail() {
        //TODO handle later
    }

    function handleConfigure() {
        //TODO handle later
    }

    function handleView() {
        //TODO handle later
    }

    const renderAction = () => {
        if (card?.status === PluginsStatusEnums?.UNINSTALLED) {
            return <S.ButtonViewDetail onClick={handleViewDetail}>
                <EyeOutlined />
                <Typography fontWeight={fontWeight?.semiBold}>{t('plugins.view-detail')}</Typography>
            </S.ButtonViewDetail>
        }
        return <S.ActionWrap>
            <S.ButtonConfigure onClick={handleConfigure} type="primary">
                <SettingFilled />
                <Typography color={themeColors?.newtralLightest} fontWeight={fontWeight?.semiBold}>{t('plugins.configure')}</Typography>
            </S.ButtonConfigure>
            <S.ButtonView onClick={handleView}>
                <EyeOutlined />
                <Typography fontWeight={fontWeight?.semiBold}>{t('plugins.view-detail')}</Typography>
            </S.ButtonView>
            <S.ButtonDelete onClick={handleViewDetail}>
                <DeleteOutlined />
            </S.ButtonDelete>
        </S.ActionWrap >
    }

    return (
        <S.CardPluginsContainer>
            {isLoading ? <S.CardPluginSkeleton>
                <S.CardHeader>
                    <Skeleton.Image active style={{ width: 60, height: 60 }} />
                    <Skeleton.Input active style={{ minWidth: 30, height: 28, width: 80 }} />
                </S.CardHeader>
                <Skeleton.Input active style={{ minWidth: 100, width: 100, height: 28, marginTop: 14 }} />
                <Skeleton.Input active style={{ minWidth: 250, width: 250, height: 40, marginTop: 4 }} />
                <Skeleton.Input active style={{ minWidth: 100, width: '100%', height: 28, marginTop: 14 }} />
            </S.CardPluginSkeleton>
                :
                <S.CardPlugin>
                    <S.CardHeader>
                        <Image
                            src={card?.icon || icImageDefault}
                            width={60}
                            height={60}
                            onError={(e) => {
                                e.currentTarget.src = icImageDefault;
                            }}
                            preview={false}
                        />

                        <S.PluginType $type={card?.type}>
                            <Typography textAlign="center">{t(`plugins.${card?.type}`)}</Typography>
                        </S.PluginType>
                    </S.CardHeader>
                    <Typography margin="14px 0 0 0" fontWeight={fontWeight?.semiBold}>{card?.name || '--/--'}</Typography>
                    <S.Description>
                        <Typography>{card?.description || '--/--'}</Typography>
                    </S.Description>
                    {renderAction()}
                </S.CardPlugin>
            }
        </S.CardPluginsContainer>
    )
}

export default CardPlugin