import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TagFacesIcon from '@mui/icons-material/TagFaces';

export default function SearchField({ username, clearSearch }) {
    const handleDelete = () => {
        clearSearch()
      };
    return (
        <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
                <Chip
                    label={username}
                    // icon={<TagFacesIcon />}
                    color="success"
                    variant="filled"
                    onDelete={handleDelete} 
                />
            </Stack>
        </Stack>
    );
}