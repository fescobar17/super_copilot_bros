'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import Hud from '@/components/Hud';
import Scenery from '@/components/Scenery';
import Title from '@/components/Title';
import { getSector } from '@/content';
import { UI } from '@/content/ui';
import { LeadSchema } from '@/lib/payload';
import { useGame, useHydrated } from '@/lib/store';

type Field = 'name' | 'email';
const FIELDS: { key: Field; label: string; type: string; autoComplete: string; required: boolean }[] = [
  { key: 'name', label: UI.registro.name, type: 'text', autoComplete: 'name', required: true },
  { key: 'email', label: UI.registro.email, type: 'email', autoComplete: 'email', required: true },
];

export default function RegistroPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const sector = getSector(useGame((s) => s.sector));
  const answers = useGame((s) => s.answers);
  const result = useGame((s) => s.result);
  const storedLead = useGame((s) => s.lead);
  const setLead = useGame((s) => s.setLead);
  const finishLevel = useGame((s) => s.finishLevel);

  const [values, setValues] = useState<Record<Field, string>>({
    name: '',
    email: '',
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field | 'consent', string>>>({});

  useEffect(() => {
    if (!hydrated) return;
    if (!sector || answers.length < sector.questions.length) {
      router.replace(sector ? '/nivel' : '/pista');
      return;
    }
    if (!result) finishLevel();
    if (storedLead) router.replace('/resultado');
  }, [hydrated, sector, answers.length, result, storedLead, finishLevel, router]);

  if (!hydrated || !sector) return <main className="min-h-dvh" />;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = LeadSchema.safeParse({ ...values, consent });
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as Field | 'consent';
        if (next[k]) continue;
        next[k] =
          k === 'consent' ? UI.registro.consentRequired : k === 'email' && values.email.trim() ? UI.registro.invalidEmail : UI.registro.required;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setLead(parsed.data);
    router.push('/resultado');
  };

  return (
    <main className="relative min-h-dvh">
      <Scenery variant="compact" />
      <Hud coins={answers.length} label={`${sector.emoji} ${sector.name}`} />
      <div className="relative z-10 mx-auto max-w-md px-4 pb-28 pt-4">
        <Title text={UI.registro.title} size="text-[34px]" className="text-center" />
        <p className="mt-3 text-center font-semibold sky-text">{UI.registro.subtitle}</p>
        <form onSubmit={onSubmit} noValidate className="panel mt-5 flex flex-col gap-4 p-4">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label htmlFor={`f-${f.key}`} className="mb-1 block text-sm font-extrabold text-mario-ink">
                {f.label}
                {f.required ? <span aria-hidden className="text-mario-red"> *</span> : null}
              </label>
              <input
                id={`f-${f.key}`}
                type={f.type}
                autoComplete={f.autoComplete}
                required={f.required}
                aria-invalid={Boolean(errors[f.key])}
                aria-describedby={errors[f.key] ? `e-${f.key}` : undefined}
                value={values[f.key]}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="min-h-[48px] w-full rounded-xl border-2 border-mario-ink bg-white px-3 text-base text-mario-ink outline-none focus:ring-4 focus:ring-mario-yellow"
              />
              {errors[f.key] ? (
                <p id={`e-${f.key}`} className="mt-1 text-sm font-bold text-mario-red">
                  {errors[f.key]}
                </p>
              ) : null}
            </div>
          ))}
          <label className="flex items-start gap-3 text-sm font-semibold text-neutral-700">
            <input
              id="f-consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              className="mt-0.5 h-6 w-6 flex-none accent-[#1F5FE0]"
            />
            <span>{UI.registro.consent}</span>
          </label>
          {errors.consent ? <p className="-mt-2 text-sm font-bold text-mario-red">{errors.consent}</p> : null}
          <button type="submit" className="btn-primary w-full">
            {UI.registro.submit} →
          </button>
        </form>
      </div>
    </main>
  );
}
