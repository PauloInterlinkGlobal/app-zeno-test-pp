import { ITemplate, TemplatesFiltersValue } from '../interfaces/templates';
import { filterTemplates } from '../utils/templates-filters';
import { AddTemplateModal } from './Modal/AddTemplateModal';
import { TemplatePhonePreview } from './TemplatePreview/TemplatePhonePreview';
import { TemplatesFilters } from './TemplateFilters/TemplatesFilters';
import { TemplatesGrid } from './TemplatesGrid/TemplatesGrid';

interface TemplatesListProps {
  data: ITemplate[];
  filters: TemplatesFiltersValue;
}

export function TemplatesList({ data, filters }: TemplatesListProps) {
  const templates = filterTemplates(data, filters);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] items-start">
      <div className="flex flex-col gap-6 min-w-0">
        <TemplatesFilters />
        <TemplatesGrid initialTemplates={templates} />
        <AddTemplateModal />
      </div>

      <div className="hidden lg:block lg:sticky lg:top-6">
        <TemplatePhonePreview />
      </div>
    </div>
  );
}

export default TemplatesList;
