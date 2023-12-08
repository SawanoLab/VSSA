import { AnalysisStart } from "./AnalysisStart";
import AttackEndZoneSelect from "./AttackCard/AttackEndZoneSelect";
import AttackEvalution from "./AttackCard/AttackEvalution";
import AttackPlayer from "./AttackCard/AttackPlayer";
import AttackResult from "./AttackCard/AttackResult";
import AttackSkillType from "./AttackCard/AttackSkillType";
import BlockEvalution from "./BlockCard/BlockEvalution";
import BlockPlayer from "./BlockCard/BlockPlayer";
import BlockZone from "./BlockCard/BlockZone";
import ReceptionEvaluation from "./ReceptionCard/ReceptionEvaluation";
import ReceptionPlayer from "./ReceptionCard/ReceptionPlayer";
import ReceptionZoneSelect from "./ReceptionCard/ReceptionZoneSelect";
import ServeEndZone from "./ServeCard/ServeEndZone";
import { ServeEvaluation } from "./ServeCard/ServeEvaluation";
import ServeStartZone from "./ServeCard/ServeStartZone";
import { ServeTeamSelect } from "./ServeCard/ServeTeamSelect";


export type StepType = 'analysisStart' | 'serveTeamSelect' | 'serveStartZone' | 'serveEndZone' | 'serveEvaluation' | 'attackPlayer' | 'attackSkillType' | 'attackEndZoneSelect' | 'attackEvalution' | 'attackResult' | 'receptionPlayer' | 'receptionZoneSelect' | 'receptionEvaluation' | 'blockPlayer' | 'blockZone' | 'blockEvalution';

export const StepComponents = {
  'analysisStart': AnalysisStart,
  'serveTeamSelect': ServeTeamSelect,
  'serveStartZone': ServeStartZone,
  'serveEndZone': ServeEndZone,
  'serveEvaluation': ServeEvaluation,
  'attackPlayer': AttackPlayer,
  'attackSkillType': AttackSkillType,
  'attackEndZoneSelect': AttackEndZoneSelect,
  'attackEvalution': AttackEvalution,
  'attackResult': AttackResult,
  'receptionPlayer': ReceptionPlayer,
  'receptionZoneSelect': ReceptionZoneSelect,
  'receptionEvaluation': ReceptionEvaluation,
  'blockPlayer': BlockPlayer,
  'blockZone': BlockZone,
  'blockEvalution': BlockEvalution,
};


