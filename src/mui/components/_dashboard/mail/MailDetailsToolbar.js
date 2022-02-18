import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import roundReply from '@iconify/icons-ic/round-reply';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'
import { useRouter } from 'next/router';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Tooltip, Typography, IconButton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/mui/routes/paths';
// utils
import createAvatar from 'src/mui/utils/createAvatar';
import { fDateTimeSuffix } from 'src/mui/utils/formatTime';
//
import { MAvatar, MHidden } from 'src/mui/components/@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: 84,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  justifyContent: 'space-between',
}));

// ----------------------------------------------------------------------

MailDetailsToolbar.propTypes = {
  mail: PropTypes.object,
};

export default function MailDetailsToolbar({ mail, ...other }) {
  // const navigate = useNavigate();
  const router = useRouter();
  const { systemLabel, customLabel } = useParams();
  const baseUrl = PATH_DASHBOARD.mail.root;

  const handleBack = () => {
    if (systemLabel) {
      // return navigate(`${baseUrl}/${systemLabel}`);
      return router.push(`${baseUrl}/${systemLabel}`);
    }
    if (customLabel) {
      // return navigate(`${baseUrl}/label/${customLabel}`);
      return router.push(`${baseUrl}/label/${customLabel}`);
    }
    // return navigate(`${baseUrl}/inbox`);
    return router.push(`${baseUrl}/inbox`);
  };

  return (
    <RootStyle {...other}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Back">
          <IconButton onClick={handleBack}>
            <Icon icon={arrowIosBackFill} width={20} height={20} />
          </IconButton>
        </Tooltip>

        <MAvatar
          alt={mail.from.name}
          src={mail.from.avatar}
          color={createAvatar(mail.from.name).color}
        >
          {createAvatar(mail.from.name).name}
        </MAvatar>

        <Box sx={{ ml: 2 }}>
          <Typography display="inline" variant="subtitle2">
            {mail.from.name}
          </Typography>
          <Link variant="caption" sx={{ color: 'text.secondary' }}>
            &nbsp; {`<${mail.from.email}>`}
          </Link>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            To:&nbsp;
            {mail.to.map((person) => (
              <Link color="inherit" key={person.email}>
                {person.email}
              </Link>
            ))}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <MHidden width="smDown">
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {fDateTimeSuffix(mail.createdAt)}
          </Typography>
          <Tooltip title="Reply">
            <IconButton>
              <Icon icon={roundReply} width={20} height={20} />
            </IconButton>
          </Tooltip>
        </MHidden>
        <Tooltip title="More options">
          <IconButton>
            <Icon icon={moreVerticalFill} width={20} height={20} />
          </IconButton>
        </Tooltip>
      </Box>
    </RootStyle>
  );
}
