import Button from "@/shared/components/common/Button";
import { PluginsTypeEnums } from "../../helper/enums/allPlugins";

import { css, styled } from "styled-components";

export const CardPluginsContainer = styled.section`
border: 1px solid ${(props) => props?.theme?.colors?.newtral};
box-shadow: 0px 0px 2px 0px #0000000F;
padding: 24px;
border-radius: 12px;
cursor: pointer;

&:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease-in-out;
    box-shadow: 0px 4px 8px 0px #0000001A;
}
`

export const CardPlugin = styled.div`
`

export const CardPluginSkeleton = styled.div`
display: flex;
flex-direction: column;
`
    
export const CardHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
gap: 12px;
`

export const PluginType = styled.div<{ $type: PluginsTypeEnums }>`
cursor: pointer;
padding: 4px 10px;
border-radius: ${(props) => props?.theme?.radius?.normalRadius};

p{
    font-size: ${(props) => props?.theme?.fontSize?.sm};
}

${({ $type }) => {
        switch ($type) {
        case PluginsTypeEnums?.ESSENTIALS:
                        return css`
                background-color: #E8F0FD;
                p{
                    color: ${(props) => props?.theme?.colors?.secondary};
                }
                `;
    case PluginsTypeEnums?.MINI:
                        return css`
                background-color:#E4F9D2;
                p{
                    color: #389E0D;
                }
                `;
 case PluginsTypeEnums?.FREE:
                        return css`
                background-color:#FCE9F4;

                p{
                    color:#C41D7F;
                }
                `;
                case PluginsTypeEnums?.PLUS:
                        return css`
                background-color:#FDE9E7;

                p{
                    color:#D91F11;
                }
                `;
        default:
                        return css`
                
                background-color:#F0E9FB;

                p{
                    color:#531DAB;
                }
                `;
}}}
`

export const Description = styled.div`
margin: 4px 0 14px 0;
height: 40px;

p{
font-size: ${(props) => props?.theme?.fontSize?.sm};
    display: -webkit-box;
  -webkit-line-clamp: 2;     
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
`

export const ActionWrap = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
gap: 8px;
`

export const ButtonViewDetail = styled(Button)`
display: flex;
align-items: center;
gap: 10px;
justify-content: center;
padding:12px;
`

export const ButtonConfigure = styled(Button)`
display: flex;
align-items: center;
gap: 10px;
justify-content: center;
`

export const ButtonView = styled(Button)`
display: flex;
align-items: center;
gap: 8px;
justify-content: center;
padding: 12px 4px;
`

export const ButtonDelete = styled(Button)`
display: flex;
align-items: center;
gap: 10px;
justify-content: center;
width:fit-content;

border-color: ${(props) => props?.theme?.colors?.errorDark};

.anticon-delete{
    width: 20px;
    height: 20px;

    svg{
        width: 100%;
        height: 100%;
        color: ${(props) => props?.theme?.colors?.errorDark};
    }
}
`

