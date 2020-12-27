import { NextPage } from 'next';
import React from 'react';
import { Channel } from '../components/Channel';
import { Container } from '../containers/Container';

const Index: NextPage<{ users: string[] }> = ({ users }) => (
  <Container>
    {users
      .map(user => ({ user, imgPath: `/static/live_user_${user}.jpg` }))
      .map(({ user, imgPath }) => (
        <Channel key={user} user={user} imgPath={imgPath} />
      ))}
  </Container>
);

Index.getInitialProps = () => ({
  users: [
    'hasanabi',
    'ivysky',
    'lillyvinnily',
    'natsumiii',
    'physicalgamerz',
    'potasticp',
    'spaceboy',
    'barrr_none',
    'ruutv',
    'theartofkaidn',
    'iamsimeonb',
    'seamoose',
    'ibanjy',
    'its__cole',
    'misspolaroid',
    'illkingkilla',
    'delt4forc3',
    'barefoottasha',
    'z_h_o_r_a',
    'spiritendo',
    'duendepablo',
    'notsch_',
    'annelle',
    'nmplol',
    'fps_shaka',
  ].sort(() => Math.random() - 0.5),
});

export default Index;
