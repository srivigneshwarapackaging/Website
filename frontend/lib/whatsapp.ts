export function whatsappUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  const intl = digits.startsWith("91") ? digits : `91${digits.replace(/^0/, "")}`;
  const text = encodeURIComponent(message);
  return `https://wa.me/${intl}?text=${text}`;
}

export function mapsUrl(address: string, mapUrl?: string) {
  if (mapUrl?.trim()) return mapUrl.trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
