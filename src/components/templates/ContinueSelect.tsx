import React from 'react';
import { Button } from '../Button';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { firebase } from 'src/firebase';
import { room, user } from '../../recoil/atom';

export const ContinueSelect = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(user);
  const roomInfo = useRecoilValue(room);
  const roomId = roomInfo.roomId;
  const userId = userInfo.id;

  const db = firebase.firestore();

  const getTheme = async () => {
    let themes: string[][] = [];
    await firebase
      .firestore()
      .collection('subjects')
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          const theme = doc.data().theme as string[];
          themes.push(theme);
        });
      });
    return themes[Math.floor(Math.random() * themes.length)];
  };

  const replay = async () => {
    const theme = await getTheme();
    db.collection('rooms')
      .doc(roomId)
      .update({
        finished: false,
        isGaming: false,
        theme: theme,
        [`member.${userId}.votes`]: false,
        [`member.${userInfo.id}.voted`]: false,
      });
  };

  return (
    <div className="box">
      <Button
        label="部屋を出る"
        fullwide
        onClick={() => router.back()}
        className="mb-8"
      />
      <Button label="もう一度遊ぶ coming soon" fullwide onClick={replay} />
    </div>
  );
};
