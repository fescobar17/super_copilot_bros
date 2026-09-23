import { asset, cld } from '@/content/assets';

/** "Kruger Tech | Microsoft" en blanco. Usa los logos oficiales si están cargados; si no, texto. */
export default function BrandLockup({ height = 22 }: { height?: number }) {
  const kruger = cld(asset('logoKrugerTech'), `f_auto,q_auto,h_${height * 3}`);
  const microsoft = cld(asset('logoMicrosoft'), `f_auto,q_auto,h_${height * 3}`);
  return (
    <div className="flex items-center justify-center gap-3 text-white" aria-label="Kruger Tech y Microsoft">
      {kruger ? (
        <img src={kruger} alt="Kruger Tech" style={{ height }} />
      ) : (
        <span className="font-extrabold" style={{ fontSize: height * 0.9 }}>
          Kruger Tech
        </span>
      )}
      <span aria-hidden className="h-6 w-0.5 bg-white/80" style={{ height }} />
      {microsoft ? (
        <img src={microsoft} alt="Microsoft" style={{ height }} />
      ) : (
        <span className="font-bold" style={{ fontSize: height * 0.9 }}>
          Microsoft
        </span>
      )}
    </div>
  );
}
