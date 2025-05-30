import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "users", path: "/secure/admin/users" },
    { title: "departments", path: "/secure/admin/departments" },
    { title: "teams", path: "/secure/admin/teams" },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🛡️ Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item xs={12} md={4} key={card.title}>
            <Card>
              <CardActionArea onClick={() => navigate(card.path)}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage {card.title.toLowerCase()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
