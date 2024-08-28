import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { Avatar } from '@mui/material';

export default function SearchField({ username, clearSearch,avatarUrl }) {
    const handleDelete = () => {
        clearSearch()
      };
    return (
        <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
                <Chip
                    label={username}
                    avatar={<Avatar alt="Natacha" src={avatarUrl} />}
                    color="success"
                    variant="outlined"
                    onDelete={handleDelete} 
                />
            </Stack>
        </Stack>
    );
}