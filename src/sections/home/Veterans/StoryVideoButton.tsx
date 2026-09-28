import style from './style.module.scss'

const StoryVideoButton = ({ label, onClick }: { label: string; onClick: () => void }) => {
  const characters = Array.from(`${label.toLocaleUpperCase()} `)

  return (
    <button type="button" className={style.roundButton} aria-label={label} onClick={onClick}>
      <span className={style.spinningName} aria-hidden="true">
        {characters.map((character, index) => (
          <span
            key={index}
            className={style.ringCharacter}
            style={{
              transform: `rotate(${(index * 360) / characters.length}deg)`,
              fontSize: `${Math.min(14, 250 / characters.length)}cqw`,
            }}
          >
            {character}
          </span>
        ))}
      </span>
      <span className={style.triangle} aria-hidden="true" />
    </button>
  )
}

export default StoryVideoButton
