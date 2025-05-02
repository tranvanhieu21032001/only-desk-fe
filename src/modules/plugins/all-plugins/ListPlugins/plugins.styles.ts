import { Skeleton } from "antd";

import { PluginsTypeEnums } from "../../helper/enums/allPlugins";

import { css, styled } from "styled-components";

export const PluginsContainer = styled.section`
padding: 12px;
min-height: 100vh;

background-color: ${(props) => props?.theme?.colors?.newtralLightest};

@media ${(props) => props?.theme?.breakpoints?.xlMax} {
    margin-bottom: 12px;
}
`
export const PluginsTypesContainer = styled.div`
margin-top: 12px;

display: flex;
align-items: center;
gap: 12px;
flex-wrap: wrap;
`

export const SkeletonContainer = styled(Skeleton.Button)``

export const PluginType = styled.div<{ $type: PluginsTypeEnums }>`
cursor: pointer;
padding: 8px 12px;
border-radius: ${(props) => props?.theme?.radius?.normalRadius};

&:hover {
    animation: scaleUpDown 1s ease-in-out infinite;
}

@keyframes scaleUpDown {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

${({ $type }) => {
        switch ($type) {
        case PluginsTypeEnums?.ESSENTIALS:
                        return css`
                background-color: #E8F0FD;
                p, svg{
                    color: ${(props) => props?.theme?.colors?.secondary};
                }
                `;
    case PluginsTypeEnums?.MINI:
                        return css`
                background-color:#E4F9D2;
                p, svg{
                    color: #389E0D;
                }
                `;
 case PluginsTypeEnums?.FREE:
                        return css`
                background-color:#FCE9F4;

                p, svg{
                    color:#C41D7F;
                }
                `;
                case PluginsTypeEnums?.PLUS:
                        return css`
                background-color:#FDE9E7;

                p, svg{
                    color:#D91F11;
                }
                `;
        default:
                        return css`
                background-color:#F0E9FB;

                p,svg{
                    color:#531DAB;
                }
                `;
    }
}}

display: flex;
gap:8px;
align-items: center;
justify-content: center;

`

export const Plugins = styled.div`
margin-top: 12px;
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 12px;
align-items: center;

@media ${(props) => props?.theme?.breakpoints?.xxlMax} {
    grid-template-columns: repeat(2, 1fr);
}

@media ${(props) => props?.theme?.breakpoints?.xsMax} {
    grid-template-columns: repeat(1, 1fr);
}
`
