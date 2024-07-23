import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import styles from './aboutuspage.module.css'; 

const AboutUsPage: React.FC = () => {
  return (
    <Container
      maxWidth="md"
      className={styles.container} // Adiciona a classe do CSS
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }} >Sobre Nós</Typography>

      <Box className={styles.section}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: '700', color: 'text.primary', mb: 4, mt: 1 }}>Nossa Missão</Typography>
        <Typography variant="body1" paragraph>
        Nossa missão vai além de apenas vender produtos! Aqui, nosso objetivo é destacar a cultura de Recife como um polo de inovação, ciência e tecnologia. Nesse contexto, através de suas ações, a NiaPixelShow busca promover e celebrar a rica herança cultural da cidade, ao mesmo tempo em que demonstra como Recife se posiciona na vanguarda do desenvolvimento tecnológico e científico.        </Typography>
      </Box>

      <Box className={styles.section}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: '700', color: 'text.primary', mb: 4, mt: 1 }}>Nossos Valores</Typography>
        <Typography variant="body1" paragraph>
          <ul className={styles.list}>
            <li>Arte</li>
            <li>Cultura</li>
            <li>Inovação</li>
            <li>Tecnologia</li>
          </ul>
        </Typography>
      </Box>

      <Box className={styles.section}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: '700', color: 'text.primary', mb: 4, mt: 1 }}>Nossa História</Typography>
        <Box className={`${styles.section} ${styles.flexContainer}`}>
          <Box className={styles.textSection}>
            <Typography variant="body1" paragraph>
              Fundada em 2022, a Niapixelshow nasceu no coração do Centro de Informática, na Universidade Federal de Pernambuco. A ideia surgiu quando Nathália, uma estudante de Engenharia da Computação, apaixonada por tecnologia e inovação, percebeu uma lacuna de fardamento do Centro e decidiu abrir um pequeno negócio de venda de camisas temáticas do seu tão querido CIn. Assim o que começou como um pequeno projeto de Nathália, hoje, graças a um projeto realizado durante uma matéria na graduação, deu origem a um website intuitivo e atrativo, que não apenas apresentará os produtos, mas também compartilhará artes autorais. 
            </Typography>
          </Box>
          <Box className={styles.imageSection}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/nia-pixel-show.appspot.com/o/Imagem%20do%20WhatsApp%20de%202024-07-23%20%C3%A0(s)%2004.24.58_c362d6a3.jpg?alt=media&token=4c81dfd0-002f-498c-a1af-1db72a0626e6"
              alt="Sobre Nós"
              className={styles.image}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
