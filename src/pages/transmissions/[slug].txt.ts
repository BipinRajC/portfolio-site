import type { APIRoute } from 'astro';

export const prerender = false;

const transmissions: Record<string, string> = {
  handshake: `CURIOUS CRAWLER // SIGNAL 03
STATUS: TRANSMISSION FRAGMENTED

An operator left the next coordinates in three out-of-order frames.
Put the frames in numerical order, join their payloads, then decode the
standard base64. The result is a path on this site.

FRAME 03: bmFsLnR4dA==
FRAME 01: L3RyYW5zbWlz
FRAME 02: c2lvbnMvc2ln

HINT: No passwords, accounts, or external services are needed.
`,
  signal: `CURIOUS CRAWLER // SIGNAL 04
STATUS: HANDSHAKE ACCEPTED

You reassembled the packets. The next address went through a rather
old-fashioned substitution: every letter was rotated by 13 places.
The slashes and dots survived the trip untouched.

ROT13: /genafzvffvbaf/yrqtre.gkg

HINT: Applying the same rotation again restores the original address.
`,
  ledger: `CURIOUS CRAWLER // SIGNAL 05
STATUS: ATTESTATION REQUIRED

The relay kept a tiny audit log. Some messages came from unverified
sources. To find the final transmission, keep only VERIFIED=yes records,
sort them by SEQ, and take the first letter of each WORD. The resulting
word is the lowercase address under /transmissions/ (no file extension).

SEQ 04 VERIFIED=yes WORD=Reason
SEQ 02 VERIFIED=yes WORD=Evidence
SEQ 00 VERIFIED=no WORD=Ignore
SEQ 07 VERIFIED=yes WORD=Follow
SEQ 05 VERIFIED=yes WORD=Inspect
SEQ 03 VERIFIED=yes WORD=Build
SEQ 08 VERIFIED=no WORD=Noise
SEQ 01 VERIFIED=yes WORD=Decode
SEQ 06 VERIFIED=yes WORD=Explore

HINT: Trust is a property to verify, not a line to assume.
`,
};

export const GET: APIRoute = ({ params }) => {
  const text = params.slug && Object.hasOwn(transmissions, params.slug) ? transmissions[params.slug] : undefined;
  return new Response(text ?? 'Transmission not found.\n', {
    status: text ? 200 : 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  });
};
