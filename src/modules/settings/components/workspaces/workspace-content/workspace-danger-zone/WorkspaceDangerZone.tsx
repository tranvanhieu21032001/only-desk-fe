import Button from '@/shared/components/common/Button';
import Typography from '@/shared/components/common/Typography';
import themeColors from '@/shared/styles/themes/default/colors';
import fontWeight from '@/shared/styles/themes/default/fontWeight';

import * as S from './WorkspaceDangerZone.styles';

import iconLogout from '@/assets/icons/workspace/ic-logout.svg';
import iconDelete from '@/assets/icons/workspace/ic-delete.svg';

const WorkspaceDangerZone = () => {
  return (
    <S.AccountInformationContainer>
      <S.AccountInformation>
        <S.AccountInformationLabel>
          <Typography
            fontWeight={fontWeight?.semiBold}
            color={themeColors?.secondaryDarker}
          >
            Danger zone
          </Typography>
        </S.AccountInformationLabel>

        <S.CopyBox>
          <p>Leave workspace</p>

          <S.WorkspaceRow>
            <span>You will not be able to access the workspace anymore</span>
            <Button
              width="180px"
              type="primary"
              icon={
                <>
                  <img src={iconLogout} alt="" />
                </>
              }
              iconPosition="left"
            >
              Leave Workspace
            </Button>
          </S.WorkspaceRow>
        </S.CopyBox>

        <S.CopyBox>
          <p>Delete workspace</p>

          <S.WorkspaceRow>
            <span>
              All OnlyChat data will be permanently deleted and non-recoverable
            </span>
            <Button
              width="180px"
              type="danger"
              icon={
                <>
                  <img src={iconDelete} alt="" />
                </>
              }
              iconPosition="left"
            >
              Delete workspace
            </Button>
          </S.WorkspaceRow>
        </S.CopyBox>
      </S.AccountInformation>
    </S.AccountInformationContainer>
  );
};

export default WorkspaceDangerZone;
