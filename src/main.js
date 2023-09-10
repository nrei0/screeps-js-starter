import { ErrorMapper } from './util/errorMapper';

export const loop = ErrorMapper.wrapLoop(() => {
	console.log(`Current game tick is ${Game.time}`);
})
