import { CARDIOSURGEON, CT_SPECIALIST } from '@/constants/conts'

const rolesList = {
  cardiosurgeon: Symbol(CARDIOSURGEON),
  ct_specialist: Symbol(CT_SPECIALIST),
};

export const useWorkerStatus = (
  workerRole = rolesList.cardiosurgeon.description
) => {
  let role;

  switch (workerRole) {
    case rolesList.cardiosurgeon.description:
      role = "Кардиохирург";
      break;
    case rolesList.ct_specialist.description:
      role = "КТ Специалист";
      break;
    default:
      role = "None";
  }

  return role;
};
