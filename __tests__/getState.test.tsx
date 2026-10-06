import { router, Stack, useNavigation } from 'expo-router';
import { act, renderRouter } from 'expo-router/testing-library';
import { useEffect } from 'react';
import { Text } from 'react-native';

const fromGetState: string[][] = [];
const fromEvent: string[][] = [];
const names = (state: { routes: { name: string }[] }) => state.routes.map((r) => r.name);

function Sheet() {
  const navigation = useNavigation();
  useEffect(
    () =>
      navigation.addListener('state', (event: any) => {
        fromGetState.push(names(navigation.getState()!));
        fromEvent.push(names(event.data.state));
      }),
    [navigation],
  );
  return <Text>Sheet</Text>;
}

it('getState() in a state listener matches the event', async () => {
  await renderRouter(
    {
      _layout: () => <Stack />,
      index: () => <Text>Home</Text>,
      sheet: Sheet,
      detail: () => <Text>Detail</Text>,
    },
    { initialUrl: '/' },
  );
  await act(async () => router.push('/sheet'));
  await act(async () => router.navigate('/detail'));

  expect(fromEvent.at(-1)).toEqual(['index', 'sheet', 'detail']); // 57 and 58
  expect(fromGetState.at(-1)).toEqual(['index', 'sheet', 'detail']); // 57 passes, 58 gives ['index', 'sheet']
});
