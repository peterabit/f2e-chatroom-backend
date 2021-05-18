import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

test('bcrypt', async () => {
  const saltRounds = 10
  const myPlaintextPassword = 's0//P4$$w0rD'
  const myPlaintextHash =
    '$2b$10$pOvOY./isWks4L96mQy0TuUusLYi1x5pGSG8SBP9A58ddSB0dIqJ6'
  const someOtherPlaintextPassword = 'not_bacon'

  const passwordHash = await bcrypt.hash(myPlaintextPassword, saltRounds)
  const otherPasswordHash = await bcrypt.hash(
    someOtherPlaintextPassword,
    saltRounds
  )

  const isPwdEqual = await bcrypt.compare(myPlaintextPassword, myPlaintextHash)
  expect(isPwdEqual).toBeTruthy()
  expect(passwordHash).not.toBe(otherPasswordHash)
})

test('jsonwebtoken', () => {
  const JWT_KEY = 'JWT_KEY'
  const payload = {
    userName: 'username',
  }
  const token = jwt.sign(payload, JWT_KEY)
  expect(jwt.verify(token, JWT_KEY)).toBeTruthy()
})
