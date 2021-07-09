import illustrationImg from '../assets/images/illustration.svg'

export function Aside() {
    return (
        <aside>
        <img src={illustrationImg} alt="Questions and answers illustration" />
        <strong>Create realtime Q&amp;A rooms</strong>
        <p>Help to mitigate your audience's doubts in realtime</p>
      </aside>
    )
}