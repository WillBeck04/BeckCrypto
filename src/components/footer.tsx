import Link from 'next/link'
import { Container } from './container'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 p-5 text-sm dark:border-slate-800">
      <Container>
        <div className="grid lg:grid-cols-2">
          <div className="text-slate-800 dark:text-slate-200">
            <h3 className="text-xl font-bold">Cryptosito</h3>
            <p className="mt-2 lg:mt-5">&copy; 2023 Paweł Sobaniec</p>
          </div>
          <div className="mt-10 flex flex-col gap-10 text-slate-800 dark:text-slate-200 lg:mt-0 lg:flex-row lg:justify-self-end">
            <div>
              <h4 className="text-lg font-medium leading-7">Products</h4>
              <ul className="mt-3 space-y-3  text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="#">Blockchain</Link>{' '}
                </li>
                <li>
                  <Link href="#">Crypto API</Link>
                </li>
                <li>
                  <Link href="#">Explorer</Link>
                </li>
                <li>
                  <Link href="#">Crypto Indices</Link>
                </li>
                <li>
                  <Link href="#">Crypto Doodles</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium leading-7">Socials</h4>
              <ul className="mt-3 space-y-3 text-slate-600 dark:text-slate-400">
                <li>
                  <Link href="#">Github</Link>
                </li>
                <li>
                  <Link href="#">Twitter</Link>
                </li>
                <li>
                  <Link href="#">Linkedin</Link>
                </li>
                <li>
                  <Link href="#">Youtube</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
