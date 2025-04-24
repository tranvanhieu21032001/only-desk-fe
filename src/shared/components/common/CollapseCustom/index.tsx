import React, { useState } from "react";
import { Image } from "antd";

import * as S from "./collapse.styles";

import arrClose from "@/assets/icons/common/ic-arrow-down.svg";

interface CollapseProps {
  title: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const Collapse = ({ title, defaultOpen = true, children }: CollapseProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <S.Section $isOpen={open}>
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
