export const calculateCost = (packageWeight, packageLength, packageWidth, packageHeight, distance, shippingType = null) => {
  const weightCost = packageWeight * 0.5;
  const dimensionCost = (packageLength + packageWidth + packageHeight) * 0.1;
  const shippingCost = shippingType === 'express' ? 20 : 0;
  const distanceCost = distance * 0.2;
  return { weightCost, dimensionCost, shippingCost, distanceCost };
};