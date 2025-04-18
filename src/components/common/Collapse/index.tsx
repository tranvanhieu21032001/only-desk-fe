import { useState } from "react";
import { Image } from "antd";
import arrClose from "@/assets/icons/common/ic-arr-close.svg";
import * as S from "./collapse.styles";

interface CollapseProps {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}

const Collapse = ({ title, defaultOpen = true, children }: CollapseProps) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <S.Section>
            <S.SectionHeader onClick={() => setOpen(!open)}>
                {title}
                <S.CollapseIcon isOpen={open}>
                    <Image src={arrClose} preview={false} />
                </S.CollapseIcon>
            </S.SectionHeader>

            {open && <S.SectionContent>{children}</S.SectionContent>}
        </S.Section>
    );
};

export default Collapse;
