import IPlayer from '../../types/IPlayer'
import { Container } from './TurnInfo.styles'
import PlayerSymbol from '../PlayerSymbolSmall'

interface IGameStatus {
  player: IPlayer;
  currentPlayer: IPlayer;
  valueMapping: { [key: string]: string }
}

export default function TurnInfo({
  player,
  currentPlayer,
  valueMapping,
}: IGameStatus) {
  return (
    <Container>
      <div>
        {player.id === currentPlayer.id ? 'Sua vez' : 'É a vez de'}:
      </div>
      <div>
        <PlayerSymbol value={currentPlayer.id} valueMapping={valueMapping} />{' '}
        {currentPlayer.name}
      </div>
    </Container>
  )
}
