import { Image, Skeleton } from 'antd'; 
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
 
import themeColors from '@/shared/styles/themes/default/colors'; 
import fontWeight from '@/shared/styles/themes/default/fontWeight'; 
 
import Typography from '../../../Typography'; 
 
import * as S from './card.styled'; 
 
import { Contact } from '@/shared/interfaces/contact.interface'; 
import ProfileCard, { ProfileType } from '../../../ProfileCard'; 
 
interface ContactCardProps { 
  data: Contact;
  isLoading?: boolean; 
  onCloseTab?: () => void; 
} 
 
function ContactCard({ 
  data, 
  isLoading, 
  onCloseTab 
}: ContactCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoading && data?.id) {
      navigate(`/contacts/${data.id}`);
      
      if (onCloseTab) {
        onCloseTab();
      }
    }
  };

  return ( 
    <Fragment> 
      {isLoading ? ( 
        <S.MessageCardContainer> 
          <Skeleton.Image active style={{ width: 38, height: 38 }} /> 
           
          <S.ContentCardWrap> 
            <S.LabelCardWrap> 
              <S.Label> 
                <Skeleton.Input 
                  active 
                  style={{ minWidth: 80, maxWidth: 80, height: 18 }} 
                /> 
              </S.Label> 
            </S.LabelCardWrap> 
             
            <S.Description> 
              <S.Label> 
                <Skeleton.Input active style={{ height: 18 }} /> 
              </S.Label> 
            </S.Description> 
          </S.ContentCardWrap> 
        </S.MessageCardContainer> 
      ) : ( 
        <S.MessageCardContainer
          onClick={handleClick}
          style={{ 
            cursor: data?.id ? 'pointer' : 'default',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (data?.id) {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        > 
          <ProfileCard 
            profileInfo={{ 
              id: data?.id, 
              type: ProfileType.CONTACT, 
              name: data?.name, 
              email: data?.email, 
              avatar: data?.avatar, 
              context: data?.context, 
            }} 
          /> 
           
          <S.ContentCardWrap> 
            <S.LabelCardWrap> 
              <S.Label> 
                <Typography fontWeight={fontWeight?.semiBold}> 
                  {data?.name} 
                </Typography> 
              </S.Label> 
            </S.LabelCardWrap> 
             
            <S.Description> 
              <Typography 
                color={themeColors?.newtralLight} 
                variant="caption-small" 
              > 
                {data?.email} 
              </Typography> 
            </S.Description> 
          </S.ContentCardWrap> 
        </S.MessageCardContainer> 
      )} 
    </Fragment> 
  ); 
} 
 
export default ContactCard;