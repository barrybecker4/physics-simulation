
export default {
  calculateImpact,
}

function calculateImpact(contact) {
  const bodyA = contact.m_fixtureA.m_body;
  const bodyB = contact.m_fixtureB.m_body;
  const velocity = bodyA.c_velocity.v.clone();
  velocity.sub(bodyB.c_velocity.v);
  const velocityMag = velocity.length();
  const mass1 = bodyA.m_mass ? bodyA.m_mass : 10;
  const mass2 = bodyB.m_mass ? bodyB.m_mass : 10;
  const energy = 0.5 * mass1 * mass2 * velocityMag * velocityMag;
  console.log("energy = " + energy);
  return energy;
}